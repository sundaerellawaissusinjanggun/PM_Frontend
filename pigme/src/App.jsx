// firebase.js에서 db를 import
import { db } from "./firebase";
import { useEffect, useState } from "react";
// firestore의 메서드 import
import { doc, getDoc } from "firebase/firestore";

function App() {
    const [test, setTest] = useState(null);

    // async - await로 데이터 fetch 대기
    async function getTest() {
        // document에 대한 참조 생성
        const docRef = doc(db, "user", "fJ8f56y9UG8ZDfaCE6xR");
        // 참조에 대한 Snapshot 쿼리
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Timestamp를 Date 객체로 변환
            if (data.createdAt && data.createdAt.toDate) {
                data.createdAt = data.createdAt.toDate();
            }
            setTest(data);
        }
    }

    // 최초 마운트 시에 getTest 호출
    useEffect(() => {
        getTest();
    }, []);

    return (
        <div>
            {test ? (
                <div>
                    <p>
                        <strong>ID:</strong> {test.id}
                    </p>
                    <p>
                        <strong>Nickname:</strong> {test.nickname}
                    </p>
                    <p>
                        <strong>Bio:</strong> {test.bio}
                    </p>
                    <p>
                        <strong>Created At:</strong>{" "}
                        {test.createdAt ? test.createdAt.toLocaleString() : "No date available"}
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;
