import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Logout = ({onLogout}) => {
	return (
		<SettingSection icon={User} title={"Logout"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<div>
					<p className='text-gray-400'>Logout your account</p>
				</div>
			</div>

			<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'
			onClick={Logout}>
				Logout
			</button>
		</SettingSection>
	);
};
export default Logout;
