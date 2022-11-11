
// import * as React from 'react';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';


// export default function PaginationControlled(props) {
//     const [page, setPage] = React.useState(1);
//     const handleChange = (event, value) => {
//         props.setCurrentPage(value)
//     };

//     const pagenumbers = []
//     for (var i = 1; i <= Math.ceil(props.totalpost / props.postperpage); i++) {
//         pagenumbers.push(i)
//     }

//     return (
//         <>
//             <Stack spacing={2}>
//                 <Pagination count={pagenumbers.length} page={page} onChange={handleChange} variant="outlined" shape="rounded" hidePrevButton hideNextButton />
//             </Stack>
//         </>
//     );
// }


