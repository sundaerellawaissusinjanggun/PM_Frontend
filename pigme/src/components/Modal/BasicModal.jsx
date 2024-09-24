import { useEffect } from "react";
import ReactModal from "react-modal";
import styled from "@emotion/styled";
import { Block, Text } from "../../styles/UI";

export default function BasicModal({ isOpen, setIsOpen, title, width, height, children }) {
    useEffect(() => {
        const handleClose = event => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleClose);
        }

        return () => {
            window.removeEventListener("keydown", handleClose);
        };
    }, [isOpen, setIsOpen]);

    return (
        <>
            <ReactModal
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        zIndex: "999",
                    },
                    content: {
                        outline: "none",
                        margin: "0 auto",
                        marginTop: "320px",
                        padding: 0,
                        width,
                        height,
                        borderRadius: "20px",
                        boxShadow: "3px 3px 20px 0 rgba(0, 0, 0, 0.25)",
                        overflowY: "scroll",
                        backgroundColor: "white",
                    },
                }}
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="MODAL"
            >
                <Style.Wrapper>
                    <Text.Body1>{title}</Text.Body1>
                    <Block.FlexBox onClick={() => setIsOpen(false)} justifyContent="flex-end">
                        <Text.Body1>닫기</Text.Body1>
                    </Block.FlexBox>

                    <Block.FlexBox>{children}</Block.FlexBox>
                </Style.Wrapper>
            </ReactModal>
        </>
    );
}

const Style = {
    Wrapper: styled.div`
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    `,
};
