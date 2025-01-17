import { useEffect } from 'react';

const Sample = () => {
    useEffect(() => {
        console.log('Component mounted');
        return () => {
            console.log('Component unmounted');
        };
    }, []);

    return <div>GGGこれはサンプルです</div>;
}
export default Sample;