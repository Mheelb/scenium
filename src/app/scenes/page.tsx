"use client";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

export default function Scene() {
  return (
    <div className="scene">
      <ReactSVG src="/cloud-scene.svg" className="svg-container" />
    </div>
  );
}