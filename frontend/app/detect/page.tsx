'use client'

import styles from './page.module.css';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { userId } from '@/atoms/userId'

function Detect() {
  const [imageData, setImageData] = useState<Blob | null>(null);
  const [cropStatus, setCropStatus] = useState<string | null>(null);
  const [id, _] = useAtom(userId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/detect/?user_id=${id}`)
      .then(res => res.json())
      .then(data => {
        setCropStatus(data.prediction)
      })
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/img?user_id=${id}`)
      .then(res => res.blob())
      .then(data => {
        setLoading(false);
        setImageData(data);
      })
  }, [id]);

  return (
    <div>
      <h1 className={styles.title}>Disease Detection:</h1>

      <div className={styles.info}>
        {cropStatus && cropStatus === 'Rust' && <>
          <h2 className={styles.red}>Your Crop is found to be infected by <u>Rust</u></h2>
          <div className={styles.indent}>We recomend you to immediately remove the infected plants
            and store them in a plastic bag. Do not use the infected plants for composting as this will
            spread the disease throughout the garden. For more info,
            check <a href="https://www.csrorganics.com/how-to-treat-rust-disease-in-plants-organically">here</a>.</div>
        </>}
        {cropStatus && cropStatus === 'Healthy' && <>
          <h2 className={styles.green}>Your Crop is found to be <u>Healthy</u></h2>
          <div className={styles.indent}>Your crops are found to be in good condition and there are no
            signs of disease.
          </div>
        </>}
        {cropStatus && cropStatus === 'Powdery' && <>
          <h2 className={styles.green}>Your Crop is found to have <u>Powdery Mildew</u></h2>
          <div className={styles.indent}>While this is not extremely dangerous, it is still better that you take care of it.</div>
          <div className={styles.indent}>Sulphur fungicides (like Bonide Sulfur Plant Fungicide) or Copper fungicides (like
            BONIDE Copper Fungicide Dust) can be used to control it's growth. For more info,
            check <a href="https://www.arbico-organics.com/category/powdery-mildew-control#:~:text=Sulfur%20(Bonide%20Sulfur%20Plant%20Fungicide,control%20of%20powdery%20mildew%20issues.">
              here
            </a>.</div>
        </>}
      </div>

      {!loading && <div style={{ textAlign: "center" }}><img className={styles.image} width={600} src={URL.createObjectURL(imageData!)} /></div>}
    </div>
  )
}

export default Detect;
