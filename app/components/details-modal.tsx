import { useMemo } from "react";
import { UserData } from "../types";
import styles from "./details-modal.module.css"

type DetailsModalProps = UserData & { onClose: () => void }

export default function DetailsModal({ onClose, ...props}: DetailsModalProps) {
    const content = useMemo(() => {
        function objectToText(obj: object, indent = 0) {
            let text = '';
            const padding = ' '.repeat(indent);
        
            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'object' && value !== null) {
                    text += `${padding}${key}:\n`;
                    text += objectToText(value, indent + 2); // Recursively handle nested objects
                } else if (value !== null) {
                    text += `${padding}${key}: ${value}\n`;
                }
            }
        
            return text;
        }

        return objectToText({...props, id: null })
    }, [props])


    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalBody}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                {content}
            </div>
        </div>
    )
}