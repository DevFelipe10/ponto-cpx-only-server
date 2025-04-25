import React, { LegacyRef, useEffect, useState } from 'react'
import styles from './RegistroPonto.module.css'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Webcam from 'react-webcam'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { HttpStatusCode } from 'axios'
import { useFaceAuthentication } from '@/hooks/use-face-authentication'
import { ResponseApi } from '@/hooks/use-mistert'
import NavBar from '@/components/ui/nav-bar'
import { useApiAuth } from '@/hooks/use-api-auth'
import { Loader2 } from 'lucide-react'

type FormData = { registro: string }

const texts = [
  'Aguarde a captura do rosto',
  'Enviando a imagem',
  'Cadastrando o Usuário',
]

const AdicionarFaces: React.FC = () => {
  // const navigate = useNavigate();

  const { getProfile } = useApiAuth()
  const { faceRegister } = useFaceAuthentication()

  const [formAddFace, setFormAddFace] = useState<FormData>({ registro: '' })

  const [resultFaceAuthenticate, setResultFaceAuthenticate] =
    useState<ResponseApi>()
  const [submitted, setSubmitted] = useState(false)
  const [loadingCaptureFace, setLoadingCaptureFace] = useState(false)

  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState('opacity-100')
  const [looping, setLooping] = useState(false)

  const [loadingProfile, setLoadingProfile] = useState<boolean>(true)

  useEffect(() => {
    if (loadingProfile) {
      setLoadingProfile(false)

      getProfile().then(res => {
        if (res.data === undefined) {
          console.log(`${window.location.origin}`)
          window.location.href = window.location.origin
        }
      })
    }
  }, [getProfile, loadingProfile])

  const handleNext = () => {
    if (!looping) {
      setLooping(true)
      let i = 1
      const interval = setInterval(() => {
        setFade('opacity-0')
        setTimeout(() => {
          setIndex(i)
          setFade('opacity-100')
          i++
          if (i >= texts.length) {
            clearInterval(interval)
            setLooping(false)
          }
        }, 500)
      }, 3000)
    }
  }
  const changeRegistro = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormAddFace({ ...formAddFace, [name]: value })

    // const { value } = event.target
    // setFormData(prevState => ({
    //   ...prevState,
    //   matricula: value,
    // }))

    // // Manter o foco no input após atualização do estado
    // setTimeout(() => inputRef.current?.focus(), 0)
  }

  function WebcamCapture() {
    const videoConstraints = {
      // width: 1280,
      // height: 720,
      facingMode: 'user',
    }

    const webcamRef: LegacyRef<Webcam> = React.useRef(null)

    const capture = React.useCallback(async () => {
      handleNext()

      if (webcamRef.current === null) {
        // setLoadingCaptureFace(false);
        return
      }

      setLoadingCaptureFace(true)

      const imageSrc = webcamRef.current.getScreenshot({
        height: 1080,
        width: 1920,
      })!

      const resFaceRegister = await faceRegister(formAddFace.registro, imageSrc)

      console.log(resFaceRegister)

      setResultFaceAuthenticate(resFaceRegister)
      setLoadingCaptureFace(false)
      setSubmitted(true)
    }, [webcamRef])

    return (
      <div>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <div>
          <Button className="w-full rounded-t-none" onClick={capture}>
            Capturar
          </Button>
        </div>
      </div>
    )
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    document.getElementById('teste123')?.click()
  }

  return (
    <div>
      <NavBar />
      <div className="mt-20 place-items-center w-screen h-screen">
        {/* <div className={styles.header}>
          <img src={configMisterT?.URL_Img_Logo} className={styles.logo} />
        </div> */}
        {/* Card */}
        {/* <Card className="w-[887px] h-[500px] place-content-center rounded-[30px]"> */}
        <form method="POST" onSubmit={submitForm}>
          <Card
            className="w-auto h-auto place-content-center rounded-[30px]
          min-h-[250px]
          min-w-[370px]
          sm:h-[300px]
          sm:w-[500px]
          sm:px-10
          lg:w-[800px]
          lg:h-[500px]"
          >
            <CardHeader className="items-center">
              <CardTitle className="text-2xl md:text-4x1 sm:text-3xl lg:text-4xl">
                Cadastrar Face
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 justify-center">
                {/* Número de Registro */}
                {/* <div className="flex flex-col space-y-1.5 w-[507px]"> */}
                <div className="flex flex-col space-y-1.5 min-w-[300px] sm:w-[400px] lg:w-[500px]">
                  <Input
                    name="registro"
                    value={formAddFace.registro}
                    onChange={changeRegistro}
                    required
                    type="number"
                    placeholder="Número de Registro"
                    className={styles.input}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button type="submit">Cadastrar</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button id="teste123" className="hidden">
                    Abrir Captura de face
                  </Button>
                </DialogTrigger>
                {submitted ? (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Informação</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 text-center">
                      {resultFaceAuthenticate?.status ===
                      HttpStatusCode.Created ? (
                        <div>
                          <h2>Face registrada com sucesso!</h2>
                          {/* <h2>{resultFaceAuthenticate.message}</h2> */}
                        </div>
                      ) : (
                        <div>
                          <h2>Erro ao registrar a face, tente novamente</h2>
                          <h2>{resultFaceAuthenticate?.message}</h2>
                        </div>
                      )}

                      <DialogFooter className="sm:justify-center">
                        <DialogClose
                          className="bg-primary mt-4"
                          onClick={() => {
                            setLoadingCaptureFace(false)
                            setSubmitted(false)
                            setResultFaceAuthenticate(undefined)
                          }}
                        >
                          Fechar
                        </DialogClose>
                      </DialogFooter>

                      {/* <Button
                      onClick={() => {
                        setSubmitted(false);
                        setOpenDialog(false);
                        setResultFaceAuthenticate(undefined);
                        setErrorFaceAuthenticate(undefined);
                      }}
                    >
                      Tentar Novamente
                    </Button> */}
                    </div>
                  </DialogContent>
                ) : (
                  <DialogContent className="px-0 pb-0 mb-0 -grid min-h-80">
                    <DialogHeader className="px-4 mb-4">
                      <DialogTitle>Faça a captura do seu rosto</DialogTitle>
                    </DialogHeader>
                    <div className="gap-4 text-center flex justify-center center">
                      {loadingCaptureFace ? (
                        <div className="flex gap-2 py-4 place-content-center place-items-center">
                          <Loader2 className="animate-spin" />
                          {/* <p>Aguarde a captura do rosto...</p> */}
                          {index >= 0 && index < texts.length && (
                            <div
                              className={`transition-opacity duration-500 ${fade}`}
                            >
                              {texts[index]}
                            </div>
                          )}
                        </div>
                      ) : (
                        <WebcamCapture />
                      )}
                    </div>
                    <DialogFooter className="items-center"></DialogFooter>
                  </DialogContent>
                )}
              </Dialog>
            </CardFooter>
          </Card>
        </form>
        {/* )} */}
      </div>
    </div>
  )
}

export default AdicionarFaces
