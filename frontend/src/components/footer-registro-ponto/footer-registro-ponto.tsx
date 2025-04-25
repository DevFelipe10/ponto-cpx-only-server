// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "../ui/button";

// export function FooterRegistroPonto() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button type="submit">Registrar</Button>
//       </DialogTrigger>
//       {submitted ? (
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Informação</DialogTitle>
//           </DialogHeader>
//           <div className="py-4 text-center">
//             {resultFaceAuthenticate === undefined ? (
//               <h2></h2>
//             ) : (
//               <h2>Registro de ponto realizado com sucesso!</h2>
//             )}
//             <h2>
//               {resultFaceAuthenticate === undefined
//                 ? errorFaceAuthenticate?.error
//                 : resultFaceAuthenticate.message}
//             </h2>

//             <DialogFooter className="sm:justify-center">
//               <DialogClose
//                 className="bg-primary mt-4"
//                 onClick={() => {
//                   setLoadingCaptureFace(false);
//                   setSubmitted(false);
//                   setResultFaceAuthenticate(undefined);
//                   setErrorFaceAuthenticate(undefined);
//                 }}
//               >
//                 {resultFaceAuthenticate === undefined
//                   ? "Tentar Novamente"
//                   : "Fechar"}
//               </DialogClose>
//             </DialogFooter>
//           </div>
//         </DialogContent>
//       ) : (
//         <DialogContent className="px-0 pb-0 mb-0 -grid min-h-80">
//           <DialogHeader className="px-4 mb-4">
//             <DialogTitle>Faça a captura do seu rosto</DialogTitle>
//           </DialogHeader>
//           <div className="gap-4 text-center flex justify-center center">
//             {loadingCaptureFace ? (
//               <div className="py-4">
//                 <p>Aguarde a captura do rosto...</p>
//               </div>
//             ) : (
//               <WebcamCapture />
//             )}
//           </div>
//           <DialogFooter className="items-center"></DialogFooter>
//         </DialogContent>
//       )}
//     </Dialog>
//   );
// }
