import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | undefined) => {
    const [call, setCall] = useState<Call | null>(null); // Initialize with null for clarity
    const [isCallLoading, setIsCallLoading] = useState(true);
    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client || !id) {
            setIsCallLoading(false); // Set loading to false if client or id is not defined
            return;
        }

        const loadCall = async () => {
            setIsCallLoading(true); // Set loading to true before fetching
            try {
                const { calls } = await client.queryCalls({
                    filter_conditions: {
                        id: id // Directly use id as it should be a string
                    }
                });

                if (calls.length > 0) {
                    setCall(calls[0]); // Set the first call if available
                } else {
                    setCall(null); // No calls found
                }
            } catch (error) {
                console.error('Error fetching call data:', error);
                setCall(null); // Handle error by resetting call state
            } finally {
                setIsCallLoading(false); // Ensure loading state is set to false after fetching
            }
        };

        loadCall();
    }, [client, id]); // Dependencies include client and id

    return {
        call,
        isCallLoading
    };
};
