import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref("");
const isPending = ref(false);
const logOut = async () => {
    error.value = null;
    isPending.value = true;
    try {
        await projectAuth.signOut();
        isPending.value = false;
    } catch (err) {
       console.log(err.message);
       error.value = err.message;
       isPending.value = false;    
    }
};

const useLogOut = () => {
    return { error, logOut, isPending }
};

export default useLogOut;