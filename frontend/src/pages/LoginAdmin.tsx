import { CardRegistroPonto } from '@/components/card-registro-ponto/card-registro-ponto'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/sonner'
import { useApiAuth } from '@/hooks/use-api-auth'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const LoginAdmin: React.FC = () => {
  const { getToken, logout } = useApiAuth()
  const [loadingLogout, setLoadingLogout] = useState<boolean>(true)

  const [loading, setLoading] = useState<boolean>(false)

  // const [tokenResponse, setTokenResponse] = useState<TokenResponse>()

  useEffect(() => {
    if (loadingLogout) {
      setLoadingLogout(false)

      logout()
    }
    // .then(res => {
    // if (res.statusCode === HttpStatusCode.Unauthorized) {
    //   // Cookie expired
    //   redirect('/login')
    // }
    // })
    // console.log(isCookie('token'))
    // if (cookieToken) {
    //   // Extract the token from the cookie
    //   const token = cookieToken.split('=')[1]
    //   // Check if the token is valid
    //   const isValid = await isValidToken(token)
    //   if (isValid) {
    //     // Enviar para dashboard
    //     navigate('/dashboard', {
    //       replace: true,
    //     })
    //   }
    // }
  }, [loadingLogout, logout])

  async function submitLogin(
    // event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const res = await getToken(username, password)

    if (res.token === undefined) {
      setLoading(false)
      toast(res.message)
      return
    }

    // Clica no elemnto '<a>' para mudar a página
    document.getElementById('link-dashboard')?.click()
  }

  function ContentRegistroPonto() {
    return (
      <form method="POST" onSubmit={submitLogin}>
        <div className="grid gap-4 justify-center">
          {/* Número de Registro */}
          <div className="flex flex-col space-y-1.5 min-w-[300px] sm:w-[400px] lg:w-[500px]">
            <Input name="username" required placeholder="Usuário" />
          </div>
          {/* Senha */}
          <div className="flex flex-col space-y-1.5 min-w-[300px] sm:w-[400px] lg:w-[500px]">
            <Input
              type="password"
              name="password"
              required
              placeholder="Senha"
            />
          </div>
          {/* Botão Entrar */}
          <div className="flex justify-center">
            {loading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Entrar
              </Button>
            ) : (
              <Button type="submit">Entrar</Button>
            )}
          </div>

          <a id="link-dashboard" href="/#/dashboard"></a>
        </div>
      </form>
    )
  }

  return (
    <div className="place-items-center place-content-center w-screen h-screen">
      <Toaster />
      <CardRegistroPonto
        cardTitle="Login"
        cardContent={<ContentRegistroPonto />}
        // cardFooter={<Button type="submit">Entrar</Button>}
      ></CardRegistroPonto>
      {/* <div> */}
      {/* <div className={'h-10 w-10 bg-black'}></div> */}
      {/* <img src={configMisterT?.URL_Img_Logo} /> */}
      {/* </div> */}
    </div>
  )
}

export default LoginAdmin
