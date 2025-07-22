import ChartThree from "../../components/ChartThree";
import ChartTwo from "../../components/ChartTwo";
import MembersStats from "../../components/MembersStats";

export default function AdminHome() {
	return (
		<div>
			<MembersStats />
			<div className="flex flex-wrap">
				<div className="flex-1">
					<ChartThree />
				</div>
				<div className="flex-1">
					<ChartTwo />
				</div>
			</div>
		</div>
	);
}
