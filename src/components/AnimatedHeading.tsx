// AnimatedHeading.tsx
import { Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AnimatedHeading = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Estado inicial de la animación
      animate={{ opacity: 1, y: 0 }} // Estado final
      transition={{ duration: 1 }} // Duración de la animación
    >
      <Heading as="h1" size="xl" mb={5} textAlign="center" color="green.500">
        Encuentra la dirección que buscas!
      </Heading>
    </motion.div>
  );
};

export default AnimatedHeading;
