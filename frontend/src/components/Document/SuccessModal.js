import React from 'react'
import { FaCheck } from 'react-icons/fa';

export default function SuccessModal() {
    return (
        <div>
            <div class="custom-modal">
                <div class="succes succes-animation icon-top"><FaCheck /></div>
                <div class="succes border-bottom"></div>
                <div class="content">
                    <p class="type">Appointment</p>
                    <p class="message-type">Successfully verified</p>
                </div>
            </div>
        </div>
    )
}
