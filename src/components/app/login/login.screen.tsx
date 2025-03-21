import { useAuth } from "@/components/auth/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";

export default function LoginScreen() {
    const auth = useAuth();

    const navigate = useNavigate();

    const login = () => {
        auth.login("user").then(() => navigate({ to: "/" }));
    };
    return (
        <div className='mx-6 md:mx-40 flex-1 flex justify-center mt-36'>
            <div className='max-w-full grow md:max-w-xl md:min-w-xl'>
                <Card>
                    <CardHeader>
                        <CardTitle>Log into Guardlight</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-6'>
                            <div className='space-y-2'>
                                <Label htmlFor='username'>Username</Label>
                                <Input
                                    id='username'
                                    placeholder='Enter your username'
                                    // value={username}
                                    // onChange={(e) =>
                                    //     setUsername(e.target.value)
                                    // }
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='password'>Password</Label>
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='Enter your password'
                                    // value={password}
                                    // onChange={(e) =>
                                    //     setPassword(e.target.value)
                                    // }
                                />
                            </div>
                            <Button className='w-full' onClick={login}>
                                Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
