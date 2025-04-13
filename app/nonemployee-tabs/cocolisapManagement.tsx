import { ScrollView, StyleSheet, Image, Dimensions, Linking, StatusBar } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const screenWidth = Dimensions.get('window').width;

export default function CocolisapManageScreen() {
	return (
		<ThemedView style={{ flex: 1, padding: 10 }}>
			<ScrollView>
				<ThemedText type='title' style={styles.titleStyle}>Management and Intervention</ThemedText>

				<ThemedText type='default' style={styles.contentText}>
					Management and intervention for Cocolisap (Aspidiotus rigidus) infestation
					involves a combination of biological, cultural, chemical, and integrated pest
					management (IPM) strategies to control and prevent the spread of the pest in
					coconut plantations.
				</ThemedText>

				<ThemedText type='defaultSemiBold'>1. Management Strategies</ThemedText>

				<ThemedView style={styles.contentContainer}>
					<ThemedText type='defaultSemiBold' style={{ paddingBottom: 10 }}>
						{'🌱'} Regular Monitoring & Early Detection
					</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Conduct periodic inspections of coconut trees to identify infestations early.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Use yellow sticky traps to monitor the presence of flying insects that may spread cocolisap.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Implement community-based monitoring to track pest outbreaks.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<Image source={require('../../assets/images/Monitoring.png')}
						style={styles.contentImage} />

					<ThemedText type='link' style={styles.contentLink}
						onPress={() => Linking.openURL('https://www.mdpi.com/2311-7524/8/6/520')}
					>Source: https://www.mdpi.com</ThemedText>

					<ThemedText type='defaultSemiBold' style={{ paddingBottom: 10 }}>
						{'🌱'} Tree Health Maintenance
					</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Apply organic fertilizers (e.g., vermicompost) and adequate watering to improve tree resilience.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Encourage the growth of beneficial micro-organisms in the soil to boost plant immunity.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedText type='defaultSemiBold' style={{ paddingBottom: 10 }}>
						{'🌱'} Quarantine Measures
					</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Implement border inspections for farms and plantations in affected regions.
							</ThemedText>
						</ThemedView>
					</ThemedView>
				</ThemedView>

				<ThemedText type='defaultSemiBold'>2. Intervention Strategies</ThemedText>

				<ThemedText type='default' style={styles.contentText}>
					Intervention strategies are specific actions taken to reduce, control, or eliminate a problem after
					it has been identified. In the context of Cocolisap infestation, intervention strategies are methods
					used to stop the spread and minimize damage to coconut trees.
				</ThemedText>

				<ThemedView style={styles.contentContainer}>
					<ThemedText type='defaultSemiBold' style={{ paddingBottom: 10 }}>
						{'🦠'} Biological Control (Eco-friendly approach)
					</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Parasitoids:{' '}
								<ThemedText style={{ color: '#0a7ea4' }}
									onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Comperiella_calauanica')}>
									Comperiella calauanica
								</ThemedText>
								, a parasitic wasp that naturally preys on Cocolisap.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<Image source={require('../../assets/images/Comperiella_calauanica.jpg')}
						style={styles.contentImage} />

					<ThemedText type='link' style={styles.contentLink}
						onPress={() => Linking.openURL('https://mnh.uplb.edu.ph/press-release/parasitic-wasp-against-coconut-scale-insect-is-a-new-species/')}
					>Source: https://mnh.uplb.edu.ph</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Predators:{' '}
								<ThemedText style={{ color: '#0a7ea4' }}
									onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Chilocorus_nigritus')}>
									Chilocorus nigritus
								</ThemedText>
								, and other natural enemies that feed on scale insects.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<Image source={require('../../assets/images/Chilocorus_nigrita.jpg')}
						style={styles.contentImage} />

					<ThemedText type='link' style={styles.contentLink}
						onPress={() => Linking.openURL('https://www.singaporegeographic.com/insects/beetle/chilocorus-nigritus')}
					>Source: https://www.singaporegeographic.com</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Fungal Pathogens: Apply bio-control agents such as{' '}
								<ThemedText style={{ color: '#0a7ea4' }}
									onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Metarhizium_anisopliae')}>
									Metarhizium anisopliae
								</ThemedText>
								{' '} and {' '}
								<ThemedText style={{ color: '#0a7ea4' }}
									onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Beauveria_bassiana')}>
									Beauveria bassiana
								</ThemedText>
								{' '}to infect and kill the pests.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<Image source={require('../../assets/images/Metarhizium_anisopliae.png')}
						style={styles.contentImage} />

					<ThemedText type='link' style={styles.contentLink}
						onPress={() => Linking.openURL('https://rakdekorasirumah.blogspot.com/2021/05/info-baru-18-jamur-parasit.html')}
					>Source (Metarhizium anisopliae): https://rakdekorasirumah.blogspot.com</ThemedText>

					<Image source={require('../../assets/images/Beauveria_bassiana.jpeg')}
						style={styles.contentImage} />

					<ThemedText type='link' style={styles.contentLink}
						onPress={() => Linking.openURL('https://commons.m.wikimedia.org/wiki/File:Beauveria_bassiana_209703234.jpeg')}
					>Source (Beauveria bassiana): https://commons.m.wikimedia.org</ThemedText>

					<ThemedText type='defaultSemiBold' style={{ paddingBottom: 10 }}>
						{'🌱'} Cultural & Mechanical Control
					</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Pruning and Burning: Cut and properly dispose of heavily infested fronds to reduce pest populations.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Intercropping: Plant leguminous crops to improve soil health and create biodiversity that discourages pests.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Manual Removal: Use a high-pressure water spray or soapy water solution to remove insects from tree surfaces.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedText type='defaultSemiBold' style={{ paddingBottom: 10 }}>
						{'🧪'} Cultural & Mechanical Control (Last Resort)
					</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Systemic Insecticides: Apply neonicotinoids (e.g., imidacloprid) in extreme infestations,
								ensuring proper guidance from agricultural experts.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Organic Insecticides: Neem oil and botanical extracts can be used as safer alternatives.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Insect Growth Regulators: {' '}
								<ThemedText style={{ color: '#0a7ea4' }}
									onPress={() => Linking.openURL('https://npic.orst.edu/ingred/ptype/igr.html')}>
									(IGRs)
								</ThemedText>
								, these disrupt the life cycle of Cocolisap, preventing further reproduction.
							</ThemedText>
						</ThemedView>
					</ThemedView>
				</ThemedView>

				<ThemedText type='defaultSemiBold'>3. Quarantine Strategies</ThemedText>

				<ThemedText type='default' style={styles.contentText}>
					Quarantine measures help prevent the spread of Cocolisap to unaffected areas by
					restricting the movement of infested plants and materials.
				</ThemedText>

				<ThemedView style={styles.contentContainer}>
					<ThemedText type='defaultSemiBold' style={{ paddingBottom: 10 }}>
						{'🚧'} Establish Quarantine Zones
					</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Identify Affected Areas: Conduct surveys to locate Cocolisap-infested trees and set up quarantine zones.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Create Buffer Zones: Establish buffer zones around affected areas to prevent the pest from spreading.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Restrict Movement: Prohibit the transport of coconuts, seedlings, fronds, and other plant materials from infected areas.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedText type='defaultSemiBold' style={{ paddingBottom: 10 }}>
						{'🔍'} Monitor and Inspect
					</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Regular Inspection: Check coconut trees in surrounding areas for early signs of infestation.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Use Traps: Place yellow sticky traps to monitor insect movement.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Check Transported Materials: Inspect vehicles, tools, and agricultural products before leaving quarantined areas.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedText type="defaultSemiBold" style={{ paddingBottom: 10 }}>
						{'🛂'} Control Human and {'🚛'} Equipment Movement
					</ThemedText>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Limit Entry & Exit: Restrict farm workers and visitors from moving between infected and healthy.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Organic Insecticides: Neem oil and botanical extracts can be used as safer alternatives.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
								Sanitize Tools & Equipment: Disinfect tools, machinery, and clothing before leaving infested zones.
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.contentBullet}>
						<ThemedText>{'❑'} </ThemedText>
						<ThemedView style={{ flex: 1 }}>
							<ThemedText type='default' style={styles.contentText}>
							Burn or Properly Dispose of Infected Plant Parts: Cut and burn heavily infested fronds to prevent further spread.
							</ThemedText>
						</ThemedView>
					</ThemedView>
				</ThemedView>

			</ScrollView>

		</ThemedView>
	);
};

const styles = StyleSheet.create({
	titleStyle: { marginTop: 10 },
	contentContainer: { padding: 15, borderWidth: 1, borderRadius: 10, marginTop: 10 },
	contentText: { textAlign: 'justify', paddingVertical: 0 },
	contentImage: {
		alignSelf: 'center',
		borderWidth: 1,
		width: screenWidth * 0.90,
		height: screenWidth * 0.50
	},
	contentLink: { fontSize: 12, fontStyle: 'italic', alignSelf: 'center', paddingBottom: 5 },
	contentBullet: { flexDirection: 'row' }
});