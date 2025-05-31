import { Avatar, Box, Stack } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { type ChangeEvent, type FC, useRef, useState, useEffect } from 'react'

interface ImagePickerProps {
  onChange: (file: File | null) => void
  value: File | null
}

const ImagePicker: FC<ImagePickerProps> = ({ onChange, value }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onChange(file)
    }
  }

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value)
      setPreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }
    else {
      setPreview(null)
    }
  }, [value])

  return (
    <Stack gap={1}>
      <Box
        sx={{
          'position': 'relative',
          'height': '100%', // вот ключевое
          'aspectRatio': '1 / 1',
          'borderRadius': '50%',
          'overflow': 'hidden',
          'width': 'auto',
          'cursor': 'pointer',
          '&:hover .overlay': {
            opacity: 1,
          },
        }}
        onClick={handleClick}
      >
        <Avatar
          src={preview ?? undefined}
          sx={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }}
        />
        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
        >
          <CameraAltIcon fontSize="large" />
        </Box>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleChange}
        />
      </Box>
    </Stack>
  )
}

export default ImagePicker
