"use client";
import React, { useState } from "react";

interface ActionsProps {}

const Actions: React.FC<ActionsProps> = () => {
	const [text, setText] = useState("Welcome");
	return (
		<div>
			<h1 className="text-white text-5xl">{text}</h1>
		</div>
	);
};

export default Actions;
