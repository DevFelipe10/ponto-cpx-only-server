import React, { useEffect, useState } from 'react'
import { useApiAuth } from '@/hooks/use-api-auth'
import NavBar from '@/components/ui/nav-bar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import {
  SearchPersonResponse,
  useFaceAuthentication,
} from '@/hooks/use-face-authentication'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

const Dashboard: React.FC = () => {
  const { getProfile } = useApiAuth()
  const { searchPersons } = useFaceAuthentication()

  const [searchPerson, setSearchPerson] = useState<SearchPersonResponse>()

  const [actualPage, setActualPage] = useState<number>(1)
  const [pages, setPages] = useState<number[]>()
  const [loadingPagination, setLoadingPagination] = useState<boolean>(false)

  const [loadingProfile, setLoadingProfile] = useState<boolean>(true)

  const columnsTable = ['ID', 'Nome', 'Data de Criação', 'Data de Modificação']

  // const [apiResponse, setApiResponse] = useState<ApiResponse>()
  // const [profile, setProfile] = useState<Profile>()

  useEffect(() => {
    if (loadingProfile) {
      setLoadingProfile(false)

      getProfile().then(res => {
        if (res.data === undefined) {
          // setApiResponse(res.error)
          console.log(`${window.location.origin}`)
          window.location.href = window.location.origin
        }

        searchPersons().then(value => {
          const arr = Array.from({ length: value.totalPages }, (_, i) => i + 1)
          setPages(arr)
          setSearchPerson(value)
        })
      })
    }
  }, [getProfile, loadingProfile, searchPersons])

  function PaginationCustom() {
    async function onClickPagination(
      event: React.MouseEvent<HTMLAnchorElement>,
    ) {
      setLoadingPagination(true)
      const target = event.target as HTMLAnchorElement
      const href = (target.href as string).split('#')[1]
      let page = parseInt(target.text)

      if (href === 'previous') {
        if (actualPage > 1) {
          page = actualPage - 1
        }
      }

      if (href === 'next') {
        page = actualPage + 1
      }

      const res = await searchPersons(page)

      console.log(res)

      if (res.count >= 1) {
        setSearchPerson(res)
        setActualPage(page)
      }
      setLoadingPagination(false)
    }
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#previous" onClick={onClickPagination}>
              <ChevronLeft />
            </PaginationLink>
          </PaginationItem>
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          {pages!.map((page, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={onClickPagination}
                isActive={page === actualPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem>
            <PaginationLink href="#next" onClick={onClickPagination}>
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  function TableDemo() {
    return (
      <div className="w-8/12">
        {loadingPagination ? (
          <Skeleton className="h-1/2" />
        ) : (
          <Card className="px-4">
            <Table className="w-full border border-gray-300 rounded-xl overflow-hidden">
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader className="bg-white">
                <TableRow>
                  {columnsTable.map(column => (
                    <TableHead key={column} className="text-primary w-1/4">
                      {column}
                    </TableHead>
                  ))}
                  {/* <TableHead className="text-primary w-1/4">ID</TableHead>
                <TableHead className="text-primary px-4">
                  Data de Modificação
                </TableHead> */}
                  {/* <TableHead className="text-primary text-center w-1/12">
                Ações
              </TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {searchPerson!.persons.map(invoice => (
                  <TableRow key={invoice.id} className="px-4">
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.name}</TableCell>
                    <TableCell>{invoice.create_date}</TableCell>
                    <TableCell>{invoice.modified_date}</TableCell>
                    {/* <TableCell className="flex justify-center">
                  <Button variant="outline" size="icon">
                    <Edit />
                  </Button>
                </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
            </Table>
          </Card>
        )}

        <div className="h-2.5"></div>

        <PaginationCustom />
      </div>
    )
  }

  return (
    // <Layout>
    <div>
      <NavBar />
      {/* <div className="bg-white w-full h-24 fixed top-0 right-0 left-0"></div> */}
      <div className="flex place-content-center mt-20 w-screen h-screen">
        {searchPerson === undefined ? (
          <Skeleton className="h-1/2 w-8/12" />
        ) : (
          <TableDemo />
        )}

        {/* <Button className="w-fit">
          <ScanFace /> */}
        {/* <Loader2 className="animate-spin" /> */}
        {/* Login with Email
        </Button>
        <Button>
          <Mail /> Login with Email
        </Button>
        <Button>
          <Mail /> Login with Email
        </Button> */}
        {/* <div> */}
        {/* <div className={'h-10 w-10 bg-black'}></div> */}
        {/* <img src={configMisterT?.URL_Img_Logo} /> */}
        {/* </div> */}
      </div>
    </div>
    // </Layout>
  )
}

export default Dashboard
