// export const GET = async()=>{
//     try {
//         await connect().catch(console.dir);
//         const activemodules = await ActiveModules.find({stu: "6691145b3dba9effe2c19ea4"});
//         return new NextResponse(JSON.stringify(activemodules), { status: 200 });
//       } catch (error: any) {
//         return new NextResponse("error with featching users " + error, {
//           status: 500,
//         });
//       }
// }export const DELETE = async (request: Request, { params }: { params: any }) => {
//     try {
//       const _id = params.id;
//       await connect().catch(console.dir);
  
//       const deletedUser = await ActiveModules.findByIdAndDelete(_id);
  
//       if (!deletedUser) {
//         return new NextResponse("User not found", { status: 404 });
//       }
  
//       return new NextResponse(
//         JSON.stringify({
//           message: "User deleted successfully",
//           user: deletedUser,
//         }),
//         { status: 200 }
//       );
//     } catch (error) {
//       return new NextResponse("Error deleting user: " + error, { status: 500 });
//     }
//   };