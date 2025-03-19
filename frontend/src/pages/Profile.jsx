import React, { useEffect, useState } from "react";
import AddressCard from "../components/AddressCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Profile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		fetchUserProfile();
	}, []);

	const fetchUserProfile = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/user/profile', {
				withCredentials: true
			});
			setUser(response.data.user);
		} catch (error) {
			console.error('Error fetching profile:', error);
			toast.error('Failed to load profile data');
		} finally {
			setLoading(false);
		}
	};

	const handleAddAddress = () => {
		navigate('/add-address');
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="text-xl">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-3xl font-bold mb-8">My Profile</h1>

				{/* Personal Information Section */}
				<div className="bg-white rounded-lg shadow p-6 mb-6">
					<h2 className="text-xl font-semibold mb-4">Personal Information</h2>
					<div className="flex items-center space-x-6">
						<div className="relative">
							<img
								src={`http://localhost:8080/user-photo/${user.photo}`}
								alt={user.name}
								className="w-24 h-24 rounded-full object-cover"
							/>
						</div>
						<div>
							<h3 className="text-lg font-medium">{user.name}</h3>
							<p className="text-gray-600">{user.email}</p>
						</div>
					</div>
				</div>

				{/* Addresses Section */}
				<div className="bg-white rounded-lg shadow p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold">My Addresses</h2>
						<button
							onClick={handleAddAddress}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Add Address
						</button>
					</div>

					{user.addresses && user.addresses.length > 0 ? (
						<div className="space-y-4">
							{user.addresses.map((address, index) => (
								<div
									key={index}
									className="border rounded-lg p-4 hover:shadow-md transition-shadow"
								>
									<p className="font-medium">{address.street}</p>
									<p className="text-gray-600">
										{address.city}, {address.state} {address.zipCode}
									</p>
									<p className="text-gray-600">{address.country}</p>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8">
							<p className="text-gray-600">No addresses found</p>
							<p className="text-sm text-gray-500 mt-2">
								Click "Add Address" to add your first address
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;