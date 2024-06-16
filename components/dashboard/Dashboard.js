'use server';

import Todos from './Todos';
import getAllTags from '@/lib/getAllTags';
import getAllTodos from '@/lib/getAllTodos';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Dashboard = async () => {
    const [allTodos, allTags] = await Promise.all([
        getAllTodos(),
        getAllTags(),
    ]);

    if (allTodos?.error || allTags?.error) {
        return (
            <Alert
                className="mb-5 bg-destructive text-red-50"
                variant="destructive">
                <ExclamationCircleIcon className="h-4 w-4 fill-red-50" />
                <AlertTitle>Something Went Wrong</AlertTitle>
                <AlertDescription>
                    {allTodos?.error} {allTags?.error}
                </AlertDescription>
            </Alert>
        );
    }

    return <Todos todos={allTodos} tags={allTags} />;
};

export default Dashboard;
