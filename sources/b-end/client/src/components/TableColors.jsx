const TableColors = ({ colors }) => {
	return (
		<table className="w-full bg-white dark:bg-slate-800 border-collapse">
			<thead>
				<tr className="bg-tertiary-100 text-tertiary-800">
					<th className="p-4 text-left">ID</th>
					<th className="p-4 text-left">Name</th>
					<th className="p-4 text-center">Year</th>
					<th className="p-4 text-center">Color</th>
					<th className="p-4 text-center">Pantone Value</th>
				</tr>
			</thead>
			<tbody>
				{colors.map((color) => (
					<tr
						key={color.id}
						className="color-row border-t border-primary-100 hover:bg-primary-50 transition-colors duration-300 ease-linear"
					>
						<td className="p-4 text-primary-700">{color.id}</td>
						<td className="p-4 font-medium text-primary-800 capitalize">
							{color.name}
						</td>
						<td className="p-4 text-center text-tertiary-600">{color.year}</td>
						<td className="p-4 text-center">
							<div
								className="color-cell mx-auto w-12 h-12 rounded-full shadow-md border-2 border-white"
								style={{ backgroundColor: color.color }}
								title={color.color}
							/>
						</td>
						<td className="p-4 text-center font-mono text-secondary-700">
							{color.pantone_value}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TableColors;
