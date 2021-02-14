import { LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip ,
    ResponsiveContainer
} from 'recharts';
import './charts.css';

const renderLineChart = (stats)=> {

   return (
       <div className="charts">
           <h2>Clicks</h2>
           <ResponsiveContainer width="100%" height={300}>
               <LineChart  data={stats} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                   <Line type="monotone"
                         dataKey="clicks"
                         stroke="#3A80BA"
                         strokeWidth={4}
                   />
                   <CartesianGrid
                       stroke="#ccc" strokeDasharray="1 0"
                   />
                   <XAxis dataKey="date" />
                   <YAxis dataKey="clicks"/>
                   <Tooltip />
               </LineChart>
           </ResponsiveContainer>

           <h2>Page Views</h2>
           <ResponsiveContainer width="100%" height={300}>
               <LineChart  data={stats} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                   <Line type="monotone"
                         dataKey="page_views"
                         stroke="#3A80BA"
                         strokeWidth={4}
                   />
                   <XAxis dataKey="date" />
                   <YAxis dataKey="page_views"/>
                   <Tooltip />
               </LineChart>
           </ResponsiveContainer>
       </div>
       )
};


export default renderLineChart;