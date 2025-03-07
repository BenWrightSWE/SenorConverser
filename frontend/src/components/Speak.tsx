import React, {useState, useEffect, useRef} from "react";

/*
 * Houses the buttons that record the users audio.
 */
export default function Speak() {

    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    /*const [audioChunks, setAudioChunks] = useState([]);
    const [blob, setBlob] = useState(new Blob(audioChunks, {type: 'audio/wav'}));
    const mediaRecorderRef = useRef(null);*/
    const speechRecognitionRef = useRef(null);

    function setUpRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        speechRecognitionRef.current = recognition;

        recognition.lang = "es-mx";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                interimTranscript += result[0].transcript;
            }
            setTranscript(interimTranscript);
        };

        // If error occurs during the speech recognition
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        // Restarts if the recording continues
        recognition.onend = () => {
            if(isRecording){
                recognition.start();
            } else {
                recognition.stop();
            }

        };
    }

    useEffect(() => {
        if(speechRecognitionRef.current){
            if (isRecording) {
                //startRecording();
                speechRecognitionRef.current.start();
                console.log("recognition started");
            } else {
                //stopRecording();
                speechRecognitionRef.current.stop();
                console.log("recognition ended");
            }
        } else {
            setUpRecognition();
        }
    }, [isRecording]);

    const resetTranscription = () => {
        //setBlob(new Blob(audioChunks, {type: 'audio/wav'}));
        setTranscript('');
    };

    // Record changes to stop recording to send. Reset stays the same.
    return (
        <div>
            <h2>Converse?</h2>
            <div className={"speak-buttons"}>
                <button onClick={() => setIsRecording(!isRecording)}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                <button>Send</button>
                <button onClick={resetTranscription}>Reset</button>
            </div>
            <h2>Transcription</h2>
            <p>{transcript}</p>
        </div>
    );
}


// Was going to use Whisper but it was messing up too much

/*
    // Starts the media recording and sets what happens when its recording and when it's not recording.
    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        const mediaRecorder = new MediaRecorder(stream);

        //console.log("Media recorder created")

        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            setAudioChunks([...audioChunks, event.data]);
            //console.log("Audio chunks length: " + audioChunks.length);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
            //console.log("Blob created.")
            await setBlob(audioBlob);
        };

        mediaRecorder.start();
        console.log("recording");
        //console.log("Recorder State:", mediaRecorder?.state);
    }

    // Stops the recording of the media recording
    function stopRecording() {
        //console.log("stop recording called");
        // console.log("Recorder State:", mediaRecorderRef.current?.state);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            console.log("recording stopped");
            mediaRecorderRef.current.stop();
        }


        if (blob.size == 0) {
            console.log("blob is empty");
        } else {
            console.log("blob is NOT empty");
        }
    }

    // Sends results to a python backend for Whisper
    const sendResults = async () => {
        const formData = new FormData();
        formData.append('file', blob, 'speech.wav');

        try {
            const response = await fetch('http://localhost:8500/api/transcribe', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            const result = await response.json();
            console.log('Transcription', result.transcription);
            //setTranscript(result.transcription)
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };

*/