import { h } from 'preact';

import style from './Loader.css';

type Props = {
  size?: number;
};

export default ({ size = 40 }: Props) => {
  return (
    <div className={style.loader_container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 40 40"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      >
        <path
          stroke="#1C0423"
          strokeDasharray="0,0,0,0,0,94.26109313964844"
          strokeWidth="3"
          d="M5 20c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15z"
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            begin="0.2845107174993943s"
            dur="2.2023721711939297s"
            keyTimes="0; 0.5; 0.7306645519063095; 1"
            repeatCount="indefinite"
            values="0,0,0,0,0,94.26109313964844; 0,0,0,50.7757075171366,43.485385622511835,0; 0,0,21.742692811255917,72.51840032839253,0,0; 0,47.13054656982422,0,47.13054656982422,0,0"
          />
        </path>
        <path
          stroke="#FFCF40"
          strokeDasharray="0,0,0,0,0,94.26109313964844"
          strokeWidth="3"
          d="M5 20c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15z"
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            begin="0.02312654118275059s"
            dur="2.169959450787813s"
            keyTimes="0; 0.5; 0.7472334455452505; 1"
            repeatCount="indefinite"
            values="0,0,0,0,0,94.26109313964844; 0,0,0,47.652103464094324,46.60898967555411,0; 0,0,23.304494837777057,70.95659830187138,0,0; 0,47.13054656982422,0,47.13054656982422,0,0"
          />
        </path>
        <path
          stroke="#23082C"
          strokeDasharray="0,0,0,0,0,94.26109313964844"
          strokeWidth="3"
          d="M5 20c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15z"
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            begin="0.8682438723540838s"
            dur="2.1655394668561634s"
            keyTimes="0; 0.5; 0.7246404620478637; 1"
            repeatCount="indefinite"
            values="0,0,0,0,0,94.26109313964844; 0,0,0,51.91138210759376,42.349711032054685,0; 0,0,21.174855516027343,73.0862376236211,0,0; 0,47.13054656982422,0,47.13054656982422,0,0"
          />
        </path>
        <path
          stroke="#F16BFF"
          strokeDasharray="0,0,0,0,0,94.26109313964844"
          strokeWidth="3"
          d="M5 20c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15z"
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            begin="0.3088236441958795s"
            dur="2.278532895578475s"
            keyTimes="0; 0.5; 0.7147478042386262; 1"
            repeatCount="indefinite"
            values="0,0,0,0,0,94.26109313964844; 0,0,0,53.776367585904175,40.484725553744255,0; 0,0,20.242362776872127,74.01873036277631,0,0; 0,47.13054656982422,0,47.13054656982422,0,0"
          />
        </path>
        <path
          stroke="#70FFDB"
          strokeDasharray="0,0,0,0,0,94.26109313964844"
          strokeWidth="3"
          d="M5 20c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15z"
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            begin="0.440146587496812s"
            dur="2.01620857838712s"
            keyTimes="0; 0.5; 0.7429603745480338; 1"
            repeatCount="indefinite"
            values="0,0,0,0,0,94.26109313964844; 0,0,0,48.457672150616276,45.80342098903217,0; 0,0,22.901710494516085,71.35938264513236,0,0; 0,47.13054656982422,0,47.13054656982422,0,0"
          />
        </path>
      </svg>
    </div>
  );
};
