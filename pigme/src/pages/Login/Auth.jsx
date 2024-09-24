import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const navigate = useNavigate();

    useEffect(() => {
        // URL에서 인증 코드 추출
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");

        if (authCode) {
            // 여기서 인증 코드를 사용하여 서버와 통신 후,
            // 성공하면 /custom 페이지로 리디렉션

            navigate("/custom");
        } else {
            // 인증 코드가 없으면 에러 처리
            console.error("카카오 인증 실패 또는 인증 코드 없음");
        }
    }, [navigate]);

    return <div>인증 처리 중...</div>;
}
