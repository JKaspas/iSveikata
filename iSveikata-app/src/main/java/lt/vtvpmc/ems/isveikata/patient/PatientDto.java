package lt.vtvpmc.ems.isveikata.patient;

import lombok.Data;

@Data
public class PatientDto {
	
	private String Id;
	private String fullName;

	public String getFullName() {
		return fullName;
	}
}
