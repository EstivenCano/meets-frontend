import { FC } from "react";

interface GoogleIconProps {
  className?: string;
}

const GoogleIcon: FC<GoogleIconProps> = ({ className = "" }) => {
  return (
    <svg
      enableBackground='new 0 0 32 32'
      version='1.1'
      viewBox='0 0 32 32'
      xmlSpace='preserve'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className={`w-6 h-6 ${className}`}>
      <g id='Flat_copy'>
        <g>
          <g>
            <path
              d='M16.005,31.625C7.39,31.625,0.38,24.615,0.38,16S7.39,0.375,16.005,0.375S31.63,7.385,31.63,16     S24.62,31.625,16.005,31.625z'
              fill='#FFFFFF'
            />
            <path
              d='M16.005,0.75c8.409,0,15.25,6.841,15.25,15.25s-6.841,15.25-15.25,15.25S0.755,24.409,0.755,16     S7.596,0.75,16.005,0.75 M16.005,0c-8.837,0-16,7.163-16,16c0,8.836,7.163,16,16,16s16-7.164,16-16     C32.005,7.163,24.842,0,16.005,0L16.005,0z'
              fill='#E5E5E5'
            />
          </g>
        </g>
        <path
          d='M24.482,14.344c0.111,0.59,0.171,1.209,0.171,1.854c0,5.044-3.377,8.631-8.476,8.631   c-4.878,0-8.83-3.952-8.83-8.83s3.952-8.83,8.83-8.83c2.384,0,4.376,0.877,5.905,2.301l-2.489,2.489v-0.006   c-0.927-0.883-2.102-1.336-3.416-1.336c-2.914,0-5.281,2.461-5.281,5.375c0,2.913,2.368,5.381,5.281,5.381   c2.644,0,4.442-1.512,4.813-3.587h-4.813v-3.444L24.482,14.344L24.482,14.344z'
          fill='#333333'
        />
      </g>
    </svg>
  );
};

export default GoogleIcon;