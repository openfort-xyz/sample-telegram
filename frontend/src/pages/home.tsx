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
        });

    };

    useEffect(() => {
        if (embeddedState === EmbeddedState.UNAUTHENTICATED) {
            authenticate();
        }
    }, [embeddedState]); // Runs when embeddedState changes


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
                  <button className="mint-button">Mint</button>
                ) : (
                  <div className="spinner"></div>
                )}
                </div>
            </>
        </Page>
    )
}
