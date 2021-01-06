import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { ServerContext } from '../../app/ServerContext';

import styles from './ServerPicker.module.scss';

interface Server {
    connectedRealmId: number;
    region: string;
    realmName: string;
}

interface TaggedServer {
    label: string;
    value: number;
}

export const ServerPicker = () => {
    const [servers, setState] = useState([] as TaggedServer[]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({ hadError: false, message: '' });
    
    const { server, setServer } = useContext(ServerContext);

    useEffect(() => {
        const handleError = (message: string) => {
            setError({
                hadError: true,
                message
            });
            return;
        }

        const fetchData = async () => {
            let data = [] as Server[];
            try {
                data = await fetch(`http://localhost:5000/servers`)
                    .then(res => {
                        if(res.ok) return res.json();
                        else throw new Error(res.statusText);
                    });
            } catch(err) {
                handleError(`Servers not found`);
                return;
            }
            
            const taggedServers = data.map(server => ({
                label: `${server.region.toUpperCase()} ${server.realmName}`,
                value: server.connectedRealmId,
            }));

            setState(taggedServers);
            setIsLoading(false);
        };

        setIsLoading(true);
        fetchData();
    }, []);

    // Wraps the react-select to use a better filter method, current one relies on indexOf which isn't great for searching large lists
    // New custom search matches if all words in box are found anywhere in the option.label, case in-sensitive
    const customFilterOption = (option: any, rawInput: string) => {
        const words = rawInput.split(' ');
        return words.reduce(
        (acc: any, cur: any) => acc && option.label.toLowerCase().includes(cur.toLowerCase()),
        true,
        );
    };

    const onSelectChanged = (value: any, _actionMeta: any) => {
        setServer(value.value);
    };

    
    if(error.hadError) return <div>{error.message}</div>
    if(isLoading) return <div>Loading...</div>;
    
    const defaultValue = servers.find(s => s.value === server) ?? servers[0];

    return (
        <Select className={styles.select} options={servers} defaultValue={defaultValue} filterOption={customFilterOption} onChange={onSelectChanged} />
    );
}