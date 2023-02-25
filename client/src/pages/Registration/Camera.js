import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 540,
    facingMode: "environment"
};

const Camera = ({ setVoterData, voterData }) => {
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);

    const capturePhoto = React.useCallback(async (e) => {
        e.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        voterData.current_picture = url;
        setUrl(imageSrc);

        console.log(imageSrc);
        //convert this imageSrc(base64) to imageFile
        const imageFile = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(imageSrc);
        });
        // console.log(imageFile);
        setVoterData({
            ...voterData,
            current_picture: imageFile
        })
    }, [webcamRef]);

    useEffect(() => {
        setVoterData({
            ...voterData,
            current_picture: url
        })
    }, [url])
    const onUserMedia = (e) => {
        // console.log(e);
    };

    return (
        <div className="w-full flex justify-between mt-4">
            <div className="w-1/2 mr-2">
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                    mirrored={false}
                />
                <button className="mt-4 font-medium px-4 py-1 ml-2 rounded-2xl bg-[#f09b51] hover:bg-[#f0882d] cursor-pointer hover:shadow-slate-400 hover:shadow-2xl" onClick={capturePhoto}>Capture</button>
                <button className="mt-4 font-medium px-4 py-1 ml-2 rounded-2xl bg-[#f09b51] hover:bg-[#f0882d] cursor-pointer hover:shadow-slate-400 hover:shadow-2xl" onClick={(e) => {
                    e.preventDefault();
                    setUrl(null);
                }}>Refresh</button>
            </div>
            <div>
                {url ? (
                    <img src={url} alt="Screenshot" className="" />
                ) : <span className="m-auto text-center">Your Pic will be below 👇</span>}
            </div>
        </div>
    );
};

export default Camera;