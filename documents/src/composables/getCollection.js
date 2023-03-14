import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const getCollection = (collection) => {
    const error = ref("");
    const documents = ref("");
    let collectionRef = projectFirestore.collection(collection).orderBy("createdAt");
    collectionRef.onSnapshot( ( snap ) => {
        let result = [];
        snap.docs.forEach( doc => {
            doc.data().createdAt && result.push({ ...doc.data(), id: doc.id });
        } );
        documents.value = result;
        error.value = null;
    }, (err) => {
        console.log(err.message);
        documents.value = null;
        error.value = "could not fetch the data!";
    } );

    return { error, documents }
};

export default getCollection;
