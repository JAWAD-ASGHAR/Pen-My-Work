import { Card, Text, VStack } from '@chakra-ui/react'
import { FiStar } from 'react-icons/fi'
import { Icon } from '@chakra-ui/react'
import Image from 'next/image'
import { HStack } from '@chakra-ui/react'
import { CardBody } from '@chakra-ui/react'
import React from 'react'

const Testimonials = ({accentColor, textColor}: {accentColor: string, textColor: string}) => {
  return (
    <VStack spacing={8}>
    {[
      {
        text: "Pen My Work saved me hours on my assignments. The handwriting looks so natural, my professors never knew the difference!",
        author: "Alex Chen",
        role: "Computer Science Student",
        avatar:
          "https://i.pinimg.com/1200x/bb/00/fb/bb00fbabd0a58d0bc918cb8bd5664837.jpg",
      },
      {
        text: "As a teacher, I use this to create personalized worksheets. My students love the authentic handwritten feel.",
        author: "Maria Rodriguez",
        role: "Elementary School Teacher",
        avatar:
          "https://i.pinimg.com/1200x/da/63/2f/da632f84e5324a7bb62971d39c5a0c03.jpg",
      },
      {
        text: "Perfect for my design projects. The handwritten elements add that human touch clients love.",
        author: "James Wilson",
        role: "Graphic Designer",
        avatar:
          "https://i.pinimg.com/736x/66/2b/be/662bbef42e07620cbea41e3ac63a74eb.jpg",
      },
    ].map((testimonial, index) => (
      <Card
        key={index}
        bg="white"
        shadow="lg"
        border="2px solid #000000"
        boxShadow="4px 4px 0px #000000"
        borderRadius="xl"
        transition="box-shadow 0.2s"
      >
        <CardBody p={6}>
          <HStack spacing={1} mb={3}>
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                as={FiStar}
                h={4}
                w={4}
                fill={accentColor}
                color={accentColor}
              />
            ))}
          </HStack>
          <Text color={textColor} mb={4} lineHeight="relaxed">
            &ldquo;{testimonial.text}&rdquo;
          </Text>
          <HStack spacing={3}>
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.author}
              width={35}
              height={35}
              style={{ borderRadius: '50%' }}
              objectFit="cover"
            />
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold" color={textColor}>
                {testimonial.author}
              </Text>
              <Text fontSize="sm" color="#666">
                {testimonial.role}
              </Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>
    ))}
  </VStack>
  )
}

export default Testimonials