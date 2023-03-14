import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const getDocument = (collection, id) => {
    const error = ref("");
    const document = ref("");
    let documentRef = projectFirestore.collection(collection).doc(id);
    documentRef.onSnapshot( doc => {
        if (doc.data()) {
            document.value = {...doc.data(), id: doc.id };
            error.value = null;
        } else {
            error.value = "document not found!"
        };
    }, 
    (err) => {
        console.log(err.message);
        document.value = null;
        error.value = "could not fetch the data!";
    } );

    return { error, document }
};

export default getDocument;