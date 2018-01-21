package lt.vtvpmc.ems.isveikata.icd;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Entity
@Data
public class Icd implements Serializable {
	
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

