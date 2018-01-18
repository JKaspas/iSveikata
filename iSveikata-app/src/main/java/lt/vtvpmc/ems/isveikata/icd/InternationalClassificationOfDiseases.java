package lt.vtvpmc.ems.isveikata.icd;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecord;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
public class InternationalClassificationOfDiseases implements Serializable {
	
	@Id
	@Length(min = 3, max = 7)
	@NotNull
	@Column (unique = true)	
	private String icdCode;
	//ICD-10 code structure: C##(#).NNN, where C - alpha character, # - numeric character, N - numeric character or blank
	
	@NotNull
	private String title;


	public String getTitle() {
		return title;
	}

    public String getIcdCode() {
        return icdCode;
    }

    public void setIcdCode(String icdCode) {
        this.icdCode = icdCode;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

