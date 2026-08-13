import { useState, useRef } from "react";
import styles from "./Pool.module.css";

function Pool() {
  const [accepted, setAccepted] = useState(false);

  const [noPosition, setNoPosition] = useState({
    top: 0,
    left: 0,
  });

  const cardRef = useRef(null);
  const noButtonRef = useRef(null);

  const moveNoButton = () => {
    if (!cardRef.current || !noButtonRef.current) return;

    const card = cardRef.current;
    const button = noButtonRef.current;

    const cardRect = card.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const padding = 15;

    const maxX = cardRect.width - buttonRect.width - padding * 2;
    const maxY = cardRect.height - buttonRect.height - padding * 2;

    const newLeft = padding + Math.random() * maxX;
    const newTop = padding + Math.random() * maxY;

    // محاسبه موقعیت نسبی برای transform
    const buttonStyle = window.getComputedStyle(button);
    const currentLeft = parseFloat(buttonStyle.marginLeft) || 0;
    const currentTop = parseFloat(buttonStyle.marginTop) || 0;

    setNoPosition({
      left: newLeft - currentLeft,
      top: newTop - currentTop,
    });
  };

  if (accepted) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.successCard}>
            <h2>شماره حساب</h2>

            <div className={styles.accountNumber}>
              6037 9918 1234 5678
            </div>

            <h3>بنام مرتضی محمدی</h3>

            <p>
              به من پول زور وده داداش
              <br />
              پول زورررررر!! 😂
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card} ref={cardRef}>
        <h1>پول زور وده</h1>

        <div className={styles.buttons}>
          <button
            className={styles.yesButton}
            onClick={() => setAccepted(true)}
          >
            آره
          </button>

          <button
            ref={noButtonRef}
            className={styles.noButton}
            style={{
              transform: `translate(${noPosition.left}px, ${noPosition.top}px)`,
            }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
          >
            نه
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pool;