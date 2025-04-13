import { useAuth } from "@/components/auth/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { AuthApi } from "@/domain/auth/api";
import { LoginRequest } from "@/domain/auth/type";
import { GuardlightError } from "@/domain/http/api";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";
import { AlertCircle } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

export default function LoginScreen() {
    const auth = useAuth();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>();

    const login: SubmitHandler<LoginRequest> = (data) => {
        loginRequest(data);
    };

    const { mutate: loginRequest, isPending } = useMutation({
        mutationFn: (req: LoginRequest) => AuthApi.login(req),
        onSuccess: () => {
            auth.login("user").then(() => navigate({ to: "/" }));
        },
        onError: (error: GuardlightError) => {
            console.table(error);

            if (error.status === HttpStatusCode.Unauthorized) {
                toast.custom(() => (
                    <Alert
                        variant='destructive'
                        className='bg-red-50 border-red-300'
                    >
                        <AlertCircle className='h-4 w-4' />
                        <AlertTitle>Login problem</AlertTitle>
                        <AlertDescription>
                            Your username or password is incorrect.
                        </AlertDescription>
                    </Alert>
                ));
            } else {
                toast.custom(() => (
                    <Alert
                        variant='destructive'
                        className='bg-red-50 border-red-300'
                    >
                        <AlertCircle className='h-4 w-4' />
                        <AlertTitle>Login problem</AlertTitle>
                        <AlertDescription>
                            There was a problem during the login process.
                        </AlertDescription>
                    </Alert>
                ));
            }
        },
    });

    return (
        <div className='bg-[url(/src/assets/images/books.jpg)] h-full'>
            <div className='backdrop-blur-lg h-full'>
                <div className='mx-6 md:mx-40 flex-1 flex justify-center pt-48 '>
                    <div className='max-w-full grow md:max-w-xl md:min-w-xl'>
                        <Card className='p-16 space-y-4'>
                            <CardHeader>
                                <CardTitle className='justify-center flex text-4xl tracking-wider font-bold '>
                                    Guardlight
                                </CardTitle>
                                <CardDescription className='justify-center flex'>
                                    Login with username
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(login)}>
                                    <div className='space-y-6'>
                                        <div className='space-y-2'>
                                            <Label htmlFor='username'>
                                                Username
                                            </Label>
                                            <Input
                                                placeholder='Enter your username'
                                                {...register("username", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.username && (
                                                <span className='text-sm text-red-400'>
                                                    Please enter your username.
                                                </span>
                                            )}
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='password'>
                                                Password
                                            </Label>
                                            <Input
                                                type='password'
                                                placeholder='Enter your password'
                                                {...register("password", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.password && (
                                                <span className='text-sm text-red-400'>
                                                    Please enter your password.
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            className='w-full'
                                            type='submit'
                                        >
                                            <LuLoaderCircle
                                                strokeWidth={1.25}
                                                className={cn(
                                                    "animate-spin",
                                                    isPending
                                                        ? "visible"
                                                        : "hidden"
                                                )}
                                            />
                                            Login
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
