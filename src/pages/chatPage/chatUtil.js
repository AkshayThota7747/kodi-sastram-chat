import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

export const createChatAndUpdateUserChats = async (combinedId, user) => {
  //create a chat in chats collection
  await setDoc(doc(db, "chats", combinedId), { messages: [] }).then(async () => {
    const createdDate = new Date();
    //create user chats
    await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
      [combinedId + ".userInfo"]: {
        uid: user.uid,
        displayName: user.username,
        photoURL: user.photoURL,
      },
      [combinedId + ".date"]: createdDate,
    });

    await updateDoc(doc(db, "userChats", user.uid), {
      [combinedId + ".userInfo"]: {
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      },
      [combinedId + ".date"]: createdDate,
    });
  });
};

export const handleOpenUserChat = async (userId, navigate, setIsReplyPrivtelyLoader) => {
  const snapshot = await getDoc(doc(db, "users", userId));
  const user = snapshot.data();
  if (!user) {
    console.log("user not found");
    return;
  }
  const combinedId =
    auth.currentUser.uid > user.uid ? auth.currentUser.uid + user.uid : user.uid + auth.currentUser.uid;
  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      await createChatAndUpdateUserChats(combinedId, user).then((res) => {
        setIsReplyPrivtelyLoader(false);
        navigate(`/chat/userChat/${combinedId}`, {
          state: {
            avatar: user.photoURL,
            title: user.username,
            userId: user.uid,
          },
        });
      });
    } else {
      setIsReplyPrivtelyLoader(false);
      navigate(`/chat/userChat/${combinedId}`, {
        state: {
          avatar: user.photoURL,
          title: user.username,
          userId: user.uid,
        },
      });
    }
  } catch (err) {}
};

// Audio recording utils
export const startRecording = async ({ mediaRecorderRef, setInputFile, setIsRecording, setShowFilePopup }) => {
  try {
    const audio = new Audio(require("../../assets/audio/click-sound.wav"));
    await audio.play();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(chunks, { type: "audio/wav" });
      setInputFile(audioBlob);
      setIsRecording(false);
      setShowFilePopup(true);
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  } catch (error) {
    console.error("Error accessing microphone:", error);
  }
};

export const stopRecording = async ({ mediaRecorderRef }) => {
  if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
    await mediaRecorderRef.current.stop();
  }
};
