import { Link } from "@tanstack/react-router";
import { LuHouse } from "react-icons/lu";
import { Button } from "../ui/button";

type ISomethingBrokeScreen = {
    error: any;
};
export default function SomethingBrokeScreen({ error }: ISomethingBrokeScreen) {
    return (
        <div className='flex flex-col items-center justify-center h-screen text-center space-y-3'>
            <h1 className='text-4xl font-bold'>Something went wrong</h1>
            <Link to='/' className=''>
                <Button variant='link'>
                    Go back to the main screen <LuHouse />
                </Button>
            </Link>
            {(import.meta.env.MODE === "development" ||
                import.meta.env.MODE === "staging") &&
                error && (
                    <div>
                        <p className='text-sm text-muted-foreground'>
                            Development Mode Info Only
                        </p>
                        <p>{JSON.stringify(error, null, 2)}</p>
                    </div>
                )}
        </div>
    );
}
