exports.getProduct = (req, res, next) => {
	res.status(200).json({
		product: { _id: '0' }
	})
}

exports.getAllProducts = (req, res, next) => {
	res.status(200).json({
		products: [
			{
				_id: '0',
				breadcrumbs: [
					'Skin',
					'Cleanse'
				],
				title: 'In Two Minds Facial Cleanser',
				description:
					'A gentle gel-based formulation that cleanses thoroughly without drying the skin or stripping its natural oils.',
				details: [
					{
						title: 'Suited to',
						text: 'Combination skin'
					},
					{
						title: 'Skin feel',
						text: 'Purified, soft, refreshed'
					},
					{
						title: 'Key ingredients',
						text: 'Witch Hazel, Salicylic Acid, Sage Leaf'
					}
				],
				cost: 23.0,
				currency: 'GBP',
				variants: [
					{
						size: '100 mL',
						image:
							'https://www.aesop.com/medias/Aesop-Skin-In-Two-Minds-Facial-Cleanser-100mL-Small-455x524px.png?context=bWFzdGVyfGltYWdlc3wzNTI4MXxpbWFnZS9wbmd8aW1hZ2VzL2hkZi9oMDMvOTE0NzM0MjcxNjk1OC5wbmd8ZjVlMjMzOGY2NTdmZGU2NzA3MmExMTk4MjhmZTQ3ZDYwMDg2ODlkZjY1NWY3ZWUyNWM5M2RhMGI2MzIwNmMwNQ'
					},
					{
						size: '200 mL',
						image:
							'https://www.aesop.com/medias/Aesop-Skin-In-Two-Minds-Facial-Cleanser-200mL-Small-455x524px.png?context=bWFzdGVyfGltYWdlc3wxNTE5MTN8aW1hZ2UvcG5nfGltYWdlcy9oZjYvaDA3LzkwMTk3NzQ2MzE5NjYucG5nfDZkYTA4NGFmZDNkNzE1ZDc5MzgxZGUxMmIzMjBjMTYxYjg2NmNkZTQyOGU2NmEzNmMzZGMyNmIxNjBkMTlhNTY'
					}
				]
			}
		]
	})
}
