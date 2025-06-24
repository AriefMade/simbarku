import React from 'react';
import Image from 'next/image';
import styles from './contact.module.css';

const ContactPage = () => {
    return (
        <div className={styles.fullScreenContainer}>
            <div className={styles.contactContainer}>
                <h1 className={styles.title}>Contact Us</h1>
                
                <div className={styles.contactInfo}>
                    <div className={styles.qrCodeContainer}>
                        <h2>Scan to connect on WhatsApp</h2>
                        <div className={styles.qrWrapper}>
                            <Image
                                src="./images/contact/qr-wa.jpg" 
                                alt="WhatsApp QR Code"
                                width={300}
                                height={300}
                                className={styles.qrCode}
                                priority
                            />
                        </div>
                        <p>Scan the QR code to chat with us on WhatsApp</p>
                    </div>
                    
                    <div className={styles.contactDetails}>
                        <h2>Other Ways to Reach Us</h2>
                        <p><strong>Email:</strong>  contact@simbarku.co</p>
                        <p><strong>Phone:</strong>  +62 819-1346-5120</p>
                        <p><strong>Address:</strong>  Jl.Pulau Timur Gg.Tekukur No.10 Buleleng, Bali</p>
                        
                        <div className={styles.socialLinks}>
                            <h3>Follow Us</h3>
                            <div className={styles.socialIcons}>
                                <a href="https://www.instagram.com/gdwrtmaa" target="_blank" rel="noopener noreferrer" className={styles.roundedIconOnly}>
                                    <Image 
                                        src="/images/footer/instagram.svg" 
                                        alt="Instagram" 
                                        width={18}  // Ukuran lebih kecil agar pas dalam lingkaran
                                        height={18}
                                    />
                                </a>
                                <a href="https://www.facebook.com/made.arief.5209" target="_blank" rel="noopener noreferrer" className={styles.roundedIconOnly}>
                                    <Image 
                                        src="/images/footer/facebook.svg" 
                                        alt="Facebook" 
                                        width={18}
                                        height={18}
                                    />
                                </a>
                                <a href="https://x.com/GelasanTehbotol" target="_blank" rel="noopener noreferrer" className={styles.roundedIconOnly}>
                                    <Image 
                                        src="/images/footer/twitter.svg" 
                                        alt="Twitter" 
                                        width={18}
                                        height={18}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;