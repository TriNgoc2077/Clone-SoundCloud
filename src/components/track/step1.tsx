"use client";
import { FileWithPath, useDropzone } from "react-dropzone";
import "./theme.css";
import { useCallback, useState } from "react";
import { ButtonFileAudioUpload } from "./button.upload";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Typography } from "@mui/material";
interface IProps {
	setValue: (v: number) => void;
	setTrackUpload: any;
	trackUpload: any;
}
const Step1 = (props: IProps) => {
	const { data: session } = useSession();
	const [percent, setPercent] = useState(0);

	const onDrop = useCallback(
		async (acceptedFiles: FileWithPath[]) => {
			if (acceptedFiles && acceptedFiles[0]) {
				props.setValue(1);
				const audio = acceptedFiles[0];
				const formData = new FormData();
				formData.append("fileUpload", audio);
				try {
					const res = await axios.post(
						`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`,
						formData,
						{
							headers: {
								Authorization: `Bearer ${session?.access_token}`,
								target_type: "tracks",
								delay: 1500,
							},
							onUploadProgress: (ProgressEvent) => {
								let percentCompleted = Math.floor(
									(ProgressEvent.loaded * 100) /
										ProgressEvent.total!
								);
								props.setTrackUpload({
									...props.trackUpload,
									fileName: acceptedFiles[0].name,
									percent: percentCompleted,
								});
							},
						}
					);

					props.setTrackUpload((prevState: any) => ({
						...prevState,
						uploadedTrackName: res.data.data.fileName,
					}));
				} catch (error: any) {
					console.log(error?.response?.data);
				}
			}
		},
		[session]
	);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			audio: [".mp3", ".m4a", ".wav", ".webm"],
		},
	});

	const files = acceptedFiles.map((file: FileWithPath) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<section className="container">
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<ButtonFileAudioUpload />
				<p>Drag and drop some files here, or click to select files</p>
			</div>
			<aside>
				<h4>Files</h4>
				<ul>{files}</ul>
			</aside>
			<Typography color="text.disabled">"We're sorry — the upload feature is currently not available in the live version. We're working to resolve this soon."</Typography>
		</section>
	);
};
export default Step1;
