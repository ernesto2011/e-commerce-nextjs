'use server';
 
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
    try {
        //await sleep(2);
        await signIn('credentials',{
            ...Object.fromEntries(formData),
            redirect: false
        });
        return 'Success';
    } catch (error) {
        //if((error as any).type === 'CredentialsSignin'){
            return 'CredentialsSignin'
        //}
        //return 'UnknownError';
        
    }
}