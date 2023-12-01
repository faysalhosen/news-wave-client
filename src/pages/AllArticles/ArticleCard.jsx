import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { VisibilitySharp } from "@mui/icons-material";


const ArticleCard = ({ articles }) => {
  const { title, article, photoURL, _id, views } = articles;
  return (
    // <div className="p-4 rounded-md bg-base-200 shadow-2xl">
    //     <img src={image} alt="" className="h-64 rounded-md" />
    //     <div className="px-2 py-6 bg-base-200">
    //         <p className="text-3xl font-quatsans font-bold">{title}</p>
    //         <p className="font-quat">{post}...<Link className="font-bold text-blue">Learn More</Link></p>
    //         <div className="flex items-center gap-2 pt-4">
    //             <img src={author_img} alt="" className="h-10 w-10 rounded-full" />
    //             <p className="font-quatsans">{author_name}</p>
    //         </div>
    //     </div>

    // </div>
    <>
      <Card sx={{}}>
        <CardMedia
          sx={{ height: 400 }}
          image={photoURL}
          title="green iguana"
        />
        <CardContent>
          <Typography sx={{ fontFamily: "Quattrocento" }} gutterBottom variant="h5" component="div">
            <div className="flex justify-between gap-1">
              <div className="max-w-xl">{title}</div>
              <div className="text-sm text-gray-600">
                <VisibilitySharp></VisibilitySharp> {views}
              </div>
            </div>
          </Typography>

          <Typography sx={{ fontFamily: "Quattrocento Sans" }} variant="body2" color="text.secondary">
            {article?.slice(0, 100)}...
            <NavLink to={`/article/${_id}`} className='text-blue font-bold'>Read More</NavLink>
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button> */}
        </CardActions>
      </Card>
    </>
  );
};

export default ArticleCard;