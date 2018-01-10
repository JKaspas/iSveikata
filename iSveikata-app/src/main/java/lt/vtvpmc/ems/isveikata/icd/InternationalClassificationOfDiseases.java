package lt.vtvpmc.ems.isveikata.icd;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
@Table (name = "International_Classification_Of_Diseases")
public class InternationalClassificationOfDiseases {
	
	@Id
	@Length(min = 3, max = 7)
	@NotNull
	@Column (unique = true)	
	private String icdCode; 
	//ICD-10 code structure: C##(#).NNN, where C - alpha character, # - numeric character, N - numeric character or blank
	
	@NotNull
	private String icdCodeDescription;
	
	
	
	
	public InternationalClassificationOfDiseases(String icdCode, String category) {
	      this.icdCode = icdCode;
	      this.icdCodeDescription = category;
	   }

	   public InternationalClassificationOfDiseases() {
	   }

	

	   
	public String getIcdCode() {
		return icdCode;
	}

	public void setIcdCode(String icdCode) {
		this.icdCode = icdCode;
	}

	public String getCategory() {
		return icdCodeDescription;
	}

	public void setCategory(String category) {
		this.icdCodeDescription = category;
	}

}

