'use client';

import toast from 'sonner-js';

import styles from './hero.module.css';

export const Hero = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.toastWrapper}>
                <div className={styles.toast} />
                <div className={styles.toast} />
                <div className={styles.toast} />
            </div>
            <div className="text-[#ebd528] font-bold text-5xl -mt-5 mb-3">Sonner-JS</div>
            <p style={{ marginTop: 0, fontSize: 18, textAlign: 'center' }}>An opinionated toast component for Pure JS.</p>
            <div className={styles.buttons}>
                <button
                    data-primary=""
                    onClick={() => {
                        toast('Sonner', {
                            description: 'An opinionated toast component for Pure JS.',
                        });
                    }}
                    className="px-10 bg-[#ebd528] text-[#fcfcfc] text-[13px] rounded-lg font-semibold hover:bg-[#dec91e]"
                >
                    Render a toast
                </button>
                <a className={styles.button} href="https://github.com/huanfe1/sonner-js" target="_blank">
                    GitHub
                </a>
            </div>
        </div>
    );
};
