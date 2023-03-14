import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref("");
const isPending = ref(false);
const logIn = async (email, password) => {
    error.value = null;
    isPending.value = true;
    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password);
        error.value = null;
        isPending.value= false;
        // console.log(res);
        return res;
    } catch (err) {
        console.log(err.value);
        error.value = "Incorrect log in attempt! Try again please.";
        isPending.value = false;
    }
};

const useLogIn = () => {
    return {logIn, error, isPending}
};

export default useLogIn;