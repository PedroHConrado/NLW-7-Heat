import { api } from '../../services/api';

import styles from './styles.module.scss'

import logoImg from '../../assets/logo.svg'
import { useEffect, useState } from 'react';

type Message = {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

export function MessageList() {
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        api.get<Message[]>('/messages/last3').then(response => {
            setMessages(response.data)
        })
    }, []);

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {messages.map(msg => {
                    return (
                        <li key={msg.id} className={styles.message}>
                            <p className={styles.messageContent}>{msg.text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={msg.user.avatar_url} alt={msg.user.name} />
                                </div>
                                <span>{msg.user.name}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}