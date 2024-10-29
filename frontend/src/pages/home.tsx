import {FC, useEffect} from "react";
import {Page} from "../components/Page.tsx";
import whiteLogo from "../assets/logo-white.png";
import "./home.css";
import {useOpenfort} from "../hooks/useOpenfort.ts";
import {EmbeddedState} from "@openfort/openfort-js";
import {retrieveLaunchParams} from "@telegram-apps/sdk-react";
import openfortService from "../services/openfortService.ts";

export const HomePage: FC = () => {
    const { embeddedState, authenticateWithOpenfort } = useOpenfort()
    const { initDataRaw } = retrieveLaunchParams();

    const authenticate = () => {
        console.log("Authenticating...");
        if (!initDataRaw) {
            console.error("No init data found");
            return;
        }

        authenticateWithOpenfort(initDataRaw).then(() => {
            console.log("Authenticated!");
        }).catch((error) => {
            console.error("Failed to authenticate:", error);
            openfortService.logout().then(() => {
                console.log("Logged out");
            }).catch((error) => {
                console.error("Failed to logout:", error);
            });
        });

    };

    useEffect(() => {
        console.log("Embedded state changed:", embeddedState);
        if (embeddedState === EmbeddedState.UNAUTHENTICATED) {
            authenticate();
        }
    }, [embeddedState]); // Runs when embeddedState changes

    function mintNFT() {
        console.log("Minting NFT...");
        document.getElementById("mint")!.innerHTML = `<div class="spinner"></div>`;
        if (!initDataRaw) {
            console.error("No init data found");
            return;
        }

        openfortService.mintNFT(initDataRaw).then((res) => {
            console.log("NFT minted!");
            console.log("Transaction hash:", res);
            document.getElementById("msg")!.innerHTML = `<a href="https://www.oklink.com/amoy/tx/${res}" target="_blank">View transaction</a>`;
            document.getElementById("mint")!.innerHTML = `<button className="mint-button" onClick={mintNFT}>Mint</button>`;
        }).catch((error) => {
            console.error("Failed to mint NFT:", error);
            document.getElementById("msg")!.innerHTML = "Failed to mint NFT";
            document.getElementById("mint")!.innerHTML = `<button className="mint-button" onClick={mintNFT}>Mint</button>`;
        });
    }

    function logout() {
        openfortService.logout().then(() => {
            console.log("Logged out");
            window.location.reload();
        }).catch((error) => {
            console.error("Failed to logout:", error);
        });
    }


    return (
        <Page back={false}>
            <>
                <div>
                    <a href="https://www.openfort.xyz" target="_blank">
                        <img src={whiteLogo} className="logo" alt="Openfort logo" />
                    </a>
                </div>
                <div className="card">
               {embeddedState === EmbeddedState.EMBEDDED_SIGNER_NOT_CONFIGURED ? (
                  <button className="connect-button" onClick={() => openfortService.setAutomaticRecoveryMethod(initDataRaw!)}>Connect Wallet</button>
                ) : embeddedState === EmbeddedState.READY ? (
                    <>
                        <div id="mint">
                            <button className="mint-button" onClick={mintNFT}>Mint</button>
                        </div>
                        <div id="msg"></div>
                        <a onClick={logout} className="disconnect-text">Logout</a>
                    </>
                ) : (
                  <div className="spinner"></div>
                )}
                </div>
            </>
        </Page>
    )
}
