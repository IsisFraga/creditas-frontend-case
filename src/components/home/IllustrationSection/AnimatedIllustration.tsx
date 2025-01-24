import { useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export const AnimatedIllustration = () => {
 const theme = useTheme();

 const pulseAnimation = {
   scale: [4, 5, 4],
   opacity: [0.1, 0.2, 0.1]
 };

 return (
   <svg 
     viewBox="0 0 400 300" 
     fill="none" 
     xmlns="http://www.w3.org/2000/svg"
     style={{ width: '100%', height: '100%' }}
   >
     {[100, 80, 60].map((radius, index) => (
       <motion.circle
         key={radius}
         cx="200"
         cy="150"
         r={radius}
         fill={theme.palette.primary.main}
         animate={pulseAnimation}
         transition={{
           duration: 2,
           repeat: Infinity,
           delay: index * 0.2,
           ease: "easeInOut"
         }}
       />
     ))}
   </svg>
 );
};